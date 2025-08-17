using ServiceStack;
using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;

namespace ScavengerHunt.ServiceModel;

#region Base definition

[Icon(Svg = Icons.Scouter)]
public class Scouter : AuditBase
{
    [AutoIncrement]
    public long Id { get; set; }

    public Guid LinkingId { get; set; }
    public ScouterType ScouterType { get; set; }

    [Reference]
    public Unit Unit { get; set; } = default!;

    [Reference]
    public List<CacheFinding> Findings { get; set; } = [];

    [Ref(Model = nameof(Unit), RefId = nameof(Unit.Id), RefLabel = nameof(Unit.Number))]
    [References(typeof(Unit))]
    public long UnitId { get; set; }
}

public enum ScouterType
{
    Lion,
    Tiger,
    Wolf,
    Bear,
    WEBELOS,
    AOL,
    ScoutsBSAYouth,
    VenturingYouth,
    Adult
}

#endregion

#region Interactions

[Tag("Scouters"), Description("Find Scouters")]
//[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditQuery)]
public class QueryScouters : QueryDb<Scouter> { }

[Tag("Scouters"), Description("Create a new Scouter")]
//[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditCreate)]
public class CreateScouter : ICreateDb<Scouter>, IReturn<IdResponse>
{
    public Guid LinkingId { get; set; }

    [ApiAllowableValues(typeof(ScouterType))]
    public ScouterType ScouterType { get; set; }

    public long UnitId { get; set; }
}

[Tag("Scouters"), Description("Update an existing Scouter")]
//[ValidateHasRole(Roles.Staff)]
[AutoApply(Behavior.AuditModify)]
public class UpdateScouter : IPatchDb<Scouter>, IReturn<IdResponse>
{
    public long Id { get; set; }

    public Guid LinkingId { get; set; }

    [ApiAllowableValues(typeof(ScouterType))]
    public ScouterType ScouterType { get; set; }

    public long UnitId { get; set; }
}

[Tag("Scouters"), Description("Delete a Scouter")]
//[ValidateHasRole(Roles.Admin)]
[AutoApply(Behavior.AuditSoftDelete)]
public class DeleteScouter : IDeleteDb<Scouter>, IReturnVoid
{
    public long Id { get; set; }
}

#endregion